#!/usr/bin/python3

import csv
import json

# Configurações
input = 'resultados corujao - Página1.csv'
output = 'resultados corujao planilha.json'
logar = False


# Lê os dados da planilha
dados = []
dados_planilha = []
with open(input, newline='') as planilhacsv:
    reader = csv.reader(planilhacsv)
    jogos = next(reader)
    jogos.pop(0)
    for linha in reader:
        dados_planilha.append(linha)

# Busca os jogadores de cada jogo
for jogo,ijogo in zip(jogos, range(0,len(jogos))):
    ijplanilha = ijogo+1 # índice do jogo na planilha
    if logar:
        print('Buscando jogadores do jogo', jogo)
    jogadores_verde = []
    for itverde in range(0,16): # linhas de jogadores do time verde
        if dados_planilha[itverde][ijplanilha]:
            jogadores_verde.append(dados_planilha[itverde][ijplanilha])
    jogadores_branco = []
    for itbranco in range(16,31): # linhas de jogadores do time branco
        if dados_planilha[itbranco][ijplanilha]:
            jogadores_branco.append(dados_planilha[itbranco][ijplanilha])

    dados.append({
        'data': jogo,
        'jogadores_branco': jogadores_branco,
        'jogadores_verde': jogadores_verde,
        'eventos': [],
    })

# Busca os eventos (gols) de cada jogo.
# Precisa fazer isso depois de preencher os jogadores, pra saber de que time é cada jogador
for jogo,ijogo in zip(jogos, range(0,len(jogos))):
    ijplanilha = ijogo+1 # índice do jogo na planilha
    if logar:
        print('Buscando gols do jogo', jogo)
    eventos = []
    for iteventos in range(31,len(dados_planilha)): # linhas de eventos
        if dados_planilha[iteventos][ijplanilha]:
            tipo = 'GOL'
            evento = dados_planilha[iteventos][ijplanilha]
            if evento:
                if '(CONTRA)' in evento or '(contra)' in evento:
                    tipo = 'GOL_CONTRA'
                    evento = evento.replace('(CONTRA)', '').replace('(contra)', '')
                jogador = evento.strip()
                time = ''
                if jogador in dados[ijogo]['jogadores_branco']:
                    time = 'BRANCO'
                if jogador in dados[ijogo]['jogadores_verde']:
                    time = 'VERDE'
                eventos.append({
                    'tipo': tipo,
                    'time': time,
                    'jogador': jogador,
                })
                if not time:
                    print('Evento ' + tipo + ' pelo jogador ' + jogador + ' que não está na lista dos times')
    dados[ijogo]['eventos'] = eventos

# Escreve a saída em JSON
if output:
    with open(output, 'w') as f:
        f.write(json.dumps(dados, indent = 2))
        print('Json gravado em', output)
else:
    if logar:
        print('Json dos dados da planilha:')
    print(json.dumps(dados))


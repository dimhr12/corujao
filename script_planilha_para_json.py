#!/usr/bin/python3

import csv
import json

# Configurações
input = 'resultados_corujao_gdocs.csv'
output = 'resultados_corujao_gdocs.json'
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
for datajogo,ijogo in zip(jogos, range(0,len(jogos))):
    ijplanilha = ijogo+1 # índice do jogo na planilha
    if logar:
        print('Buscando jogadores do jogo', datajogo)
    mensagem = dados_planilha[0][ijplanilha]
    jogadores_verde = []
    for itverde in range(1,17): # linhas de jogadores do time verde
        if dados_planilha[itverde][ijplanilha]:
            jogadores_verde.append(dados_planilha[itverde][ijplanilha])
    jogadores_branco = []
    for itbranco in range(17,32): # linhas de jogadores do time branco
        if dados_planilha[itbranco][ijplanilha]:
            jogadores_branco.append(dados_planilha[itbranco][ijplanilha])

    dados.append({
        'data': datajogo,
        'mensagem': mensagem,
        'jogadores_branco': jogadores_branco,
        'jogadores_verde': jogadores_verde,
        'eventos': [],
    })

# Busca os eventos (gols) de cada jogo.
# Precisa fazer isso depois de preencher os jogadores, pra saber de que time é cada jogador
for datajogo,ijogo in zip(jogos, range(0,len(jogos))):
    ijplanilha = ijogo+1 # índice do jogo na planilha
    if logar:
        print('Buscando gols do jogo', datajogo)
    eventos = []
    for iteventos in range(32,len(dados_planilha)): # linhas de eventos
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


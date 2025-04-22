#!/bin/bash

# Variáveis
API_URL="http://localhost:3000"
CURATELADO_ID=""
USER_ID="seu_user_id" # Substitua pelo ID de um usuário existente

# Função para criar um curatelado
criar_curatelado() {
  echo "Criando curatelado..."
  response=$(curl -X POST "$API_URL/curatelados" \
    -H "Content-Type: application/json" \
    -d '{
      "nome": "Teste Curatelado",
      "dataNascimento": "2000-01-01",
      "cpf": "12345678900",
      "userId": "'"$USER_ID"'"
    }')
  CURATELADO_ID=$(echo $response | jq -r '.data.id')
  echo "Curatelado criado com ID: $CURATELADO_ID"
  echo $response | jq .
  if [[ -z "$CURATELADO_ID" ]]; then
    echo "Erro: Falha ao criar curatelado"
    exit 1
  fi
  # Verificar se o curatelado foi criado corretamente
  if ! echo "$response" | jq -e '.success == true'; then
    echo "Erro: Falha ao criar curatelado (verificação jq)"
    exit 1
  fi
}

# Função para criar um curatelado com dados inválidos
criar_curatelado_invalido() {
  echo "Criando curatelado com dados inválidos..."
  response=$(curl -X POST "$API_URL/curatelados" \
    -H "Content-Type: application/json" \
    -d '{
      "nome": "",
      "dataNascimento": "2000-01-01",
      "cpf": "12345678900",
      "userId": "'"$USER_ID"'"
    }')
  echo $response | jq .
  if ! echo "$response" | jq -e '.success == false'; then
    echo "Erro: Criação de curatelado inválido não detectada"
    exit 1
  fi
}

# Função para obter um curatelado
obter_curatelado() {
  echo "Obtendo curatelado..."
  response=$(curl "$API_URL/curatelados/$CURATELADO_ID")
  echo $response | jq .
  if [[ $(echo $response | jq -r '.success') != "true" ]]; then
    echo "Erro: Falha ao obter curatelado"
    exit 1
  fi
  # Verificar se o curatelado foi obtido corretamente
  if ! echo "$response" | jq -e '.data.id == "'"$CURATELADO_ID"'"'; then
    echo "Erro: Falha ao obter curatelado (verificação jq)"
    exit 1
  fi
}

# Função para obter um curatelado inexistente
obter_curatelado_inexistente() {
  echo "Obtendo curatelado inexistente..."
  response=$(curl "$API_URL/curatelados/nonexistent_id")
  echo $response | jq .
  if ! echo "$response" | jq -e '.success == false'; then
    echo "Erro: Obtenção de curatelado inexistente não detectada"
    exit 1
  fi
}

# Função para atualizar um curatelado
atualizar_curatelado() {
  echo "Atualizando curatelado..."
  response=$(curl -X PUT "$API_URL/curatelados/$CURATELADO_ID" \
    -H "Content-Type: application/json" \
    -d '{
      "nome": "Teste Curatelado Atualizado",
      "dataNascimento": "2000-01-02",
      "cpf": "00987654321",
      "userId": "'"$USER_ID"'"
    }')
  echo $response | jq .
  if [[ $(echo $response | jq -r '.success') != "true" ]]; then
    echo "Erro: Falha ao atualizar curatelado"
    exit 1
  fi
  # Verificar se o curatelado foi atualizado corretamente
  if ! echo "$response" | jq -e '.data.nome == "Teste Curatelado Atualizado"'; then
    echo "Erro: Falha ao atualizar curatelado (verificação jq)"
    exit 1
  fi
}

# Função para atualizar um curatelado com dados inválidos
atualizar_curatelado_invalido() {
  echo "Atualizando curatelado com dados inválidos..."
  response=$(curl -X PUT "$API_URL/curatelados/$CURATELADO_ID" \
    -H "Content-Type: application/json" \
    -d '{
      "nome": "",
      "dataNascimento": "2000-01-02",
      "cpf": "00987654321",
      "userId": "'"$USER_ID"'"
    }')
  echo $response | jq .
  if ! echo "$response" | jq -e '.success == false'; then
    echo "Erro: Atualização de curatelado inválido não detectada"
    exit 1
  fi
}

# Função para deletar um curatelado
deletar_curatelado() {
  echo "Deletando curatelado..."
  response=$(curl -X DELETE "$API_URL/curatelados/$CURATELADO_ID")
  echo $response | jq .
  if [[ $(curl -X GET "$API_URL/curatelados/$CURATELADO_ID") ]]; then
    echo "Erro: Falha ao deletar curatelado"
    exit 1
  fi
  # Verificar se o curatelado foi deletado corretamente
  response=$(curl -X GET "$API_URL/curatelados/$CURATELADO_ID" 2>/dev/null)
  if echo "$response" | grep -q "404"; then
    echo "Curatelado deletado com sucesso (verificação grep)"
  else
    echo "Erro: Falha ao deletar curatelado (verificação grep)"
    exit 1
  fi
}

# Função para deletar um curatelado inexistente
deletar_curatelado_inexistente() {
  echo "Deletando curatelado inexistente..."
  response=$(curl -X DELETE "$API_URL/curatelados/nonexistent_id")
  echo $response | jq .
  if ! echo "$response" | jq -e '.success == false'; then
    echo "Erro: Deleção de curatelado inexistente não detectada"
    exit 1
  fi
}

# Execução dos testes
criar_curatelado
criar_curatelado_invalido
obter_curatelado
obter_curatelado_inexistente
atualizar_curatelado
atualizar_curatelado_invalido
deletar_curatelado
deletar_curatelado_inexistente

echo "Testes finalizados."

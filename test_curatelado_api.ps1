# Variáveis
$API_URL = "http://localhost:3000"
$CURATELADO_ID = ""
$USER_ID = "seu_user_id"  # Substitua pelo ID de um usuário existente

# Função para criar um curatelado
function Criar-Curatelado {
  Write-Host "Criando curatelado..."
  $headers = @{"Content-Type" = "application/json"}
  $body = (@{
    nome = "Teste Curatelado"
    dataNascimento = "2000-01-01T00:00:00.000Z"
    cpf = "12345678900"
    userId = "$($USER_ID)"
  } | ConvertTo-Json)

  Write-Host "Request Body: $body"

  $response = Invoke-RestMethod -Method Post -Uri "$API_URL/curatelados" -Headers $headers -Body $body
  $CURATELADO_ID = $response.data.id
  Write-Host "Curatelado criado com ID: $CURATELADO_ID"
  Write-Host $response | ConvertTo-Json
  if (-not $CURATELADO_ID) {
    Write-Host "Erro: Falha ao criar curatelado"
    exit 1
  }
}

# Função para obter um curatelado
function Obter-Curatelado {
  Write-Host "Obtendo curatelado..."
  $response = Invoke-RestMethod -Uri "$API_URL/curatelados/$CURATELADO_ID"
  Write-Host $response | ConvertTo-Json
  if ($response.success -ne $true) {
    Write-Host "Erro: Falha ao obter curatelado"
    exit 1
  }
}

# Função para atualizar um curatelado
function Atualizar-Curatelado {
  Write-Host "Atualizando curatelado..."
  $response = Invoke-RestMethod -Method Put -Uri "$API_URL/curatelados/$CURATELADO_ID" -ContentType "application/json" -Body (@{
    nome = "Teste Curatelado Atualizado"
    dataNascimento = "2000-01-02T00:00:00.000Z"
    cpf = "00987654321"
    userId = "$($USER_ID)"
  } | ConvertTo-Json)
  Write-Host $response | ConvertTo-Json
  if ($response.success -ne $true) {
    Write-Host "Erro: Falha ao atualizar curatelado"
    exit 1
  }
}

# Função para deletar um curatelado
function Deletar-Curatelado {
  Write-Host "Deletando curatelado..."
  Invoke-RestMethod -Method Delete -Uri "$API_URL/curatelados/$CURATELADO_ID"
  try {
    Invoke-RestMethod -Uri "$API_URL/curatelados/$CURATELADO_ID" -ErrorAction Stop
    Write-Host "Erro: Falha ao deletar curatelado"
    exit 1
  } catch {
    Write-Host "Curatelado deletado com sucesso"
  }
}

# Execução dos testes
Criar-Curatelado
Obter-Curatelado
Atualizar-Curatelado
Deletar-Curatelado

Write-Host "Testes finalizados."

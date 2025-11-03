-- 1. Cria o banco de dados se ele não existir
CREATE DATABASE IF NOT EXISTS loja_simples;

-- 2. Seleciona o banco de dados para uso
USE loja_simples;

-- 3. Remove a tabela se ela já existir, para garantir um novo começo limpo (OPCIONAL, mas útil)
DROP TABLE IF EXISTS produtos;

-- 4. Cria a tabela de produtos com os três campos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL
);

-- 5. Quatro comandos INSERT para popular a tabela
INSERT INTO produtos (nome, preco, quantidade) VALUES 
('Caneta Azul', 2.50, 150),
('Caderno Universitário', 18.99, 45),
('Régua 30cm', 5.00, 75),
('Estojo Simples', 15.50, 30);
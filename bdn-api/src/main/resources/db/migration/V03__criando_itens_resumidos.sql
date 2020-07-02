CREATE TABLE itemResumido (
    codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    listaNome VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO itemResumido (nome, listaNome) values ('Maga negra', 'Cartas Yu-Gi-Oh');
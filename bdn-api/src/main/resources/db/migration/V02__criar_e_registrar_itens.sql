CREATE TABLE item (
    codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    subcategoria VARCHAR(30),
    imagem longblob,
    codigo_lista BIGINT(20) NOT NULL,
    FOREIGN KEY (codigo_lista) REFERENCES lista(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO item (nome, descricao, subcategoria, codigo_lista) values ('O dragão alado de rá', 'Tin 2019', 'Secret Rare', 1);
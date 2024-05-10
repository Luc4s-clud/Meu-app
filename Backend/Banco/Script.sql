-- Criar o banco de dados
CREATE DATABASE InventoryApp;

-- Usar o banco de dados criado
USE InventoryApp;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Luca8428';



SHOW PLUGINS;


-- Criar a tabela de Usuários
CREATE TABLE Usuarios (
    fun_codigo VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255),
    setor VARCHAR(255),
    alocado BOOLEAN
);
CREATE TABLE Teclados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idioma VARCHAR(255),
    conexao VARCHAR(255),
    multimidia BOOLEAN,
    cor VARCHAR(255),
    marca VARCHAR(255),
    modelo VARCHAR(255),
    sn VARCHAR(255) UNIQUE,
    codigo_barras VARCHAR(255) UNIQUE,
    setor VARCHAR(255),
    fun_codigo VARCHAR(255),
    data_aquisicao DATE,
    data_conferencia DATE,
    status VARCHAR(255),
    observacao TEXT,
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE Mouse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scroll BOOLEAN,
    tipo VARCHAR(255),
    conexao VARCHAR(255),
    cor VARCHAR(255),
    sn VARCHAR(255) UNIQUE,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    codigo_barras VARCHAR(255) UNIQUE,
    setor VARCHAR(255),
    fun_codigo VARCHAR(255),
    fun_nome VARCHAR(255),
    data_aquisicao DATE,
    data_conferencia DATE,
    garantia_meses INT,
    status VARCHAR(255),
    observacao TEXT,
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE Monitor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    SN VARCHAR(255) UNIQUE,
    tamanho VARCHAR(255),
    aspecto VARCHAR(255),
    resolucao_maxima VARCHAR(255),
    conexao VARCHAR(255),
    tipo VARCHAR(255) UNIQUE,
    cor VARCHAR(255),
    power_Swpply VARCHAR(255),
    monitor VARCHAR(255),
    imobilizado VARCHAR(255),
    codigo_barras VARCHAR(255),
    fonte VARCHAR(255),
    setor VARCHAR(255),
    fun_codigo VARCHAR(255),
    fun_nome VARCHAR(255),
    data_aquisicao DATE,
    data_conferencia DATE,
    status_ VARCHAR(255),
    observacao TEXT,
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE desktop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ns VARCHAR(255),
    sistema_operacional VARCHAR(255),
    pc VARCHAR(255) UNIQUE,
    ip VARCHAR(255),
    tipo VARCHAR(255),
    bloco VARCHAR(255),
    imobilizado VARCHAR(255),
	codigo_barras VARCHAR(255),
    fun_codigo VARCHAR(255),
    fun_nome VARCHAR(255),
    data_aquisicao DATE,
    data_conferencia DATE,
    preventiva DATE,
    status_ VARCHAR(255),
    observacao VARCHAR(255),
    processador VARCHAR(255),
    memoria VARCHAR(255),
    placa_mae VARCHAR(255),
    placa_video VARCHAR(255),
    armazenamento VARCHAR(255),
    fonte VARCHAR(255),
    gabinete VARCHAR(255),
    outros VARCHAR(255),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE telefone (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    serie VARCHAR(255) UNIQUE,
    tipo VARCHAR(255),
    display boolean,
    cor VARCHAR(15),
    setor VARCHAR(28),
	codigo_barras VARCHAR(255),
    fun_codigo VARCHAR(255),
    fun_nome VARCHAR(255),
    data_aquisicao DATE,
    data_conferencia DATE,
    garantia INT,    
    observacao VARCHAR(255),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE impressoras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_barras VARCHAR(8),
    inventario VARCHAR(15),
    marca VARCHAR(255),
    modelo VARCHAR(255),
    serie VARCHAR(255) UNIQUE,
    setor VARCHAR(28),
    departamento VARCHAR(25),
    aquisição VARCHAR(25),
    garantia INT, 
    n_cartucho INT(25),
    observacao VARCHAR(255)
);
CREATE TABLE walk_talk (
id INT AUTO_INCREMENT PRIMARY KEY,
	marca VARCHAR(100),
    modelo VARCHAR(100),
    serie VARCHAR(10),
    tipo VARCHAR(100),
    display boolean,
    cor VARCHAR(10),
    power_suply VARCHAR(100),
    setor VARCHAR(100),
    cod_barras varchar(10),
    fun_codigo VARCHAR(100),
    fun_nome VARCHAR(100),
	obs VARCHAR(100),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE smartphone (

	id INT AUTO_INCREMENT PRIMARY KEY,
	mac VARCHAR(100),
    imei VARCHAR(100),
    n_serie VARCHAR(10),
    cod_barras varchar(10),
    bloco varchar(10),
    setor VARCHAR(100),
	fun_codigo VARCHAR(100),
    fun_nome VARCHAR(100),
    data_aquisicao DATE,
    data_conferencia DATE,
    status_ VARCHAR(15),
    sim VARCHAR(15),
    marca_modelo VARCHAR(15),
    so VARCHAR(50),
    processador VARCHAR(100),
    memoria VARCHAR(100),
    tela VARCHAR(50),
    camera VARCHAR(50),
    armazenamento VARCHAR(50),
    bateria VARCHAR(50),
    numero NUMERIC(50),
	obs VARCHAR(100),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE projetor (
	id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_barras VARCHAR(255) UNIQUE,
	marca VARCHAR(100),
    modelo VARCHAR(100),
    n_serie VARCHAR(10),
    power_suply VARCHAR(100),
    setor VARCHAR(100),
	fun_codigo VARCHAR(100),
    fun_nome VARCHAR(100),
    data_aquisicao DATE,
    garantia int,
    entradas VARCHAR(15),
    lumens VARCHAR(15),
    resolucao VARCHAR(15),
    contraste VARCHAR(50),
    obs VARCHAR(100),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE tablet (
	id INT AUTO_INCREMENT PRIMARY KEY,
	mac VARCHAR(100),
    imei VARCHAR(100),
    n_serie VARCHAR(10),
    imobilizado VARCHAR(10),
    cod_barras varchar(10),
    bloco varchar(10),
    setor VARCHAR(100),
	fun_codigo VARCHAR(100),
    fun_nome VARCHAR(100),
    data_aquisicao DATE,
    data_conferencia DATE,
    sim VARCHAR(15),
    status_ VARCHAR(15),
    marca_modelo VARCHAR(15),
    so VARCHAR(50),
    processador VARCHAR(100),
    memoria VARCHAR(100),
    tela VARCHAR(50),
    camera VARCHAR(50),
    armazenamento VARCHAR(50),
    bateria VARCHAR(50),
	obs VARCHAR(100),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);
CREATE TABLE coletor (
	id INT AUTO_INCREMENT PRIMARY KEY,
	mac VARCHAR(100),
    fn VARCHAR(100),
    n_serie VARCHAR(10),
    cod_barras varchar(10),
    bloco varchar(10),
    setor VARCHAR(100),
	fun_codigo VARCHAR(100),
    fun_nome VARCHAR(100),
    data_aquisicao DATE,
    data_conferencia DATE,
    status_ VARCHAR(15),
    marca_modelo VARCHAR(15),
    so VARCHAR(50),
    processador VARCHAR(100),
    memoria VARCHAR(100),
    scanner VARCHAR(15),
    tela VARCHAR(50),
    camera VARCHAR(50),
    armazenamento VARCHAR(50),
    bateria VARCHAR(50),
	obs VARCHAR(100),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);

CREATE TABLE acessorio (
	id INT AUTO_INCREMENT PRIMARY KEY,
	pn VARCHAR(100),
    modelo VARCHAR(100),
    n_serie VARCHAR(10),
    tipo VARCHAR(10),
    bloco varchar(10),
    cod_barras varchar(10),
	fun_codigo VARCHAR(100),
    fun_nome VARCHAR(100),
    setor VARCHAR(100),
    nfe VARCHAR(100),
    fabricacao DATE,
    data_aquisicao DATE,
    data_conferencia DATE,
    status_ VARCHAR(15),
    capacidade VARCHAR(15),
    voltagem VARCHAR(50),
	obs VARCHAR(100),
    fonte VARCHAR(100),
    outros VARCHAR(100),
    FOREIGN KEY (fun_codigo) REFERENCES Usuarios(fun_codigo) ON DELETE SET NULL
);

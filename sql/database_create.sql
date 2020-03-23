drop table if exists panier_produit;
drop table if exists panier CASCADE;
drop table if exists commentaires;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS produits CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id integer NOT NULL  ,
  nom_categorie varchar(45) DEFAULT NULL,
  etat integer,
  PRIMARY KEY (id)
) ;

INSERT INTO categories VALUES (1,'haut',1),(2,'short',1),(3,'chaussures',1),(4,'accessoire',1);

CREATE TABLE users (
  id integer NOT NULL ,
  nom_client varchar(45) DEFAULT NULL,
  prenom_client varchar(45) DEFAULT NULL,
  adresse_livraison varchar(45) DEFAULT NULL,
  adresse varchar(45) DEFAULT NULL,
  telephone integer DEFAULT NULL,
  password varchar(45) DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  role varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users VALUES (1,'tom','tom','3 rue garnfe','14 ch vale',123,'pass','user@mail.fr','client'),
(2,'admin','admin','25 avenue tom','14 ch vale',12399,'pass','admin@mail.fr','admin');
create sequence pan_seq;
CREATE TABLE panier (
  id integer NOT NULL DEFAULT nextval('pan_seq'),
  quantite integer DEFAULT NULL,
  prix_unitaire decimal(10,0) DEFAULT NULL,
  users_id integer NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_panier_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;
INSERT INTO panier VALUES (1,3,10,1),(2,8,3,1);
CREATE TABLE produits (
  id integer NOT NULL  ,
  nom_produit varchar(45) DEFAULT NULL,
  stock integer DEFAULT NULL,
  prix_unitaire integer DEFAULT NULL,
  designation varchar(45) DEFAULT NULL,
  image_produit varchar(30) DEFAULT NULL,
  montant_ligne integer DEFAULT NULL,
  categories_id integer NOT NULL,
  description varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_produits_categories1 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO produits VALUES (1,'t shirt',30,10,'t-shirt','rtest',13,1,'tshirt en soie d\"Inde'),
(2,'chemise',10,15,'chemise soie',NULL,18,1,'chemise coton');

INSERT INTO produits VALUES (3,'chemise',20,12,'chemise verte',null,17,1,'chemise verte taille l'),
(4,'polo',40,15,'polo',NULL,18,1,'polo coton xl'),
(5,'pantalon',22,18,'pantalon',NULL,18,2,'pantalon laine'),
(6,'bague or',5,180,'bague or',NULL,180,4,'bague or 12 carat'),
(7,'colier',2,75,'colier',NULL,80,4,'colier perle'),
(8,'chaussure nike',9,40,'chaussure',NULL,40,3,'chaussure nike 30');
create sequence com_seq;
CREATE TABLE commentaires (
  id INT NOT NULL default nextval('com_seq'),
  commentaire VARCHAR(128) NULL,
  date_commentaire Timestamp NULL,
  users_id INT NOT NULL,
  produits_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_commentaire_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_commentaire_produits1
    FOREIGN KEY (produits_id)
    REFERENCES produits (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

create sequence panier_seq;
CREATE TABLE panier_produit (
  produits_id integer NOT NULL,
  panier_id integer NOT NULL,
  id integer DEFAULT NULL nextval('panier_seq'),
PRIMARY KEY (id),
  CONSTRAINT fk_produits_has_panier_panier1 FOREIGN KEY (produits_id) REFERENCES produits (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_produits_has_panier_produits1 FOREIGN KEY (panier_id) REFERENCES panier (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO panier_produit VALUES (1,1,1),(2,2,2);

drop table if exists panier_produit;
drop table if exists panier;
drop table if exists commentaires;
DROP TABLE IF EXISTS produits;
DROP TABLE IF EXISTS produits;
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id integer NOT NULL ,
  nom_categorie varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO categories VALUES (1,'haut'),(2,'short');

CREATE TABLE panier (
  id integer NOT NULL ,
  quantite integer DEFAULT NULL,
  prix_unitaire decimal(10,0) DEFAULT NULL,
  users_id integer NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_panier_users FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;
INSERT INTO panier VALUES (1,3,10,1),(2,8,3,1);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id integer NOT NULL,
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

INSERT INTO users VALUES (1,'tom','tom','3 rue garnfe','14 ch vale',123,'pass','mail.fr','client');

CREATE TABLE commentaire (
  id integer NOT NULL,
  id_produit integer DEFAULT NULL,
  commentaire varchar(128) DEFAULT NULL,
  date varchar(45) DEFAULT NULL,
  users_id integer NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_commentaire_users1 FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;


CREATE TABLE produits (
  id integer NOT NULL ,
  nom_produit varchar(45) DEFAULT NULL,
  stock integer DEFAULT NULL,
  prix_unitaire varchar(10) DEFAULT NULL,
  designation varchar(45) DEFAULT NULL,
  image_produit varchar(30) DEFAULT NULL,
  montant_ligne varchar(45) DEFAULT NULL,
  categories_id integer NOT NULL,
  description varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_produits_categories1 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO produits VALUES (1,'t shirt',30,'10','t-shirt','rtest','13',1,'tshirt en soie d\"Inde'),(2,'chemise',10,'15','chemise soie',NULL,'18',1,'chemise coton');


CREATE TABLE panier_produit (
  produits_id integer NOT NULL,
  panier_id integer NOT NULL,
  id integer DEFAULT NULL,
  CONSTRAINT fk_produits_has_panier_panier1 FOREIGN KEY (produits_id) REFERENCES produits (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_produits_has_panier_produits1 FOREIGN KEY (panier_id) REFERENCES panier (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO panier_produit VALUES (1,1,1),(2,2,2);

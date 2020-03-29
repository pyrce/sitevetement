--tous les produits
select * from produits

--toutes les categories
select * from categories

--toutes les categories actives
select * from categories where etat =1

--toutes les categories actives
select * from categories where etat =0

--toutes les produits par categories
select * from produit p
join categories c on c.id=p.categorie_id
where c.nom_categorie='pantalon'

--tous les produits par prix
select * from produits 
order by prix asc;

--tous les produits par prix et par categorie
select * from produit p
join categories c on c.id=p.categorie_id
where c.nom_categorie='pantalon'
order by prix asc;

--ajout au panier
insert into produit_panier values(1,1,15,3,3)

--supprimer un produits du panier
delete from produit_panier 
where  produits_id=3
and  user_id=3

--mettre a jour la quantite de produit dans le panier
update produit_panier set quantite=4
where  produits_id=3
and  user_id=3

--tous les commentaires d'un produits
select * from commentaires where produits_id = 10

--maj commentaires
update commentaires set commentaires ='new com'
where id=8

--supprimer commentaires
delete commentaires 
where id=8
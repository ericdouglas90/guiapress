const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles})
    })
    
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        
        res.render('admin/articles/new', {categories: categories});
        
    })
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
console.log(title, body, category);
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles');
    });
});

router.post("/articles/delete", (req, res) => {
    const {id} = req.body;

    if(id !== undefined) {
        if(!isNaN(id)) {

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            })

        }else {// N�O FOR UM N�MERO
            res.redirect("/admin/articles");
        }
    }else { // NULL
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    const {id} = req.params;

    if(isNaN(id)){
        return res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article => {
        if(article != undefined) {

            res.render("admin/articles/edit", {article})

        }else {
            res.redirect("/admin/articles")
        }
    }).catch(error => {
        res.redirect("/admin/articles");
    });
});

module.exports = router;
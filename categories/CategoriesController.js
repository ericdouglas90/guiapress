const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

router.get("/admin/categories/new", (req, res) => {

    res.render('admin/categories/new');

});

router.post("/categories/save", (req, res) => {

    const {title}  = req.body;

    if(title !== undefined) {

        Category.create({
            title,
            slug: slugify(title)
        })
        .then(() => {
            res.redirect("/admin/categories")
        })

    }else {
        res.redirect('/admin/categories/new');
    }

});

router.get("/admin/categories", (req, res) => {


    Category.findAll().then(categories => {
        res.render("../views/admin/categories/index.ejs", {
            categories
        });
    });

});

router.post("/categories/delete", (req, res) => {
    const {id} = req.body;

    if(id !== undefined) {
        if(!isNaN(id)) {

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            })

        }else {// N?O FOR UM N?MERO
            res.redirect("/admin/categories");
        }
    }else { // NULL
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    const {id} = req.params;

    if(isNaN(id)){
        return res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {
        if(category != undefined) {

            res.render("admin/categories/edit", {category})

        }else {
            res.redirect("/admin/categories")
        }
    }).catch(error => {
        res.redirect("/admin/categories");
    });
});

router.post("/categories/update", (req, res) => {
    const {id, title} = req.body;

    Category.update({title, slug:slugify(title)}, {
        where: {
            id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    })
});

module.exports = router;
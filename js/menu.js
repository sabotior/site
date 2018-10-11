function Container(id, className, tagName) {
    if (!['div', 'ul', 'li', 'a'].includes(tagName)) {
        // Ошибка
    }

    this.id = id;
    this.class = className;
    this.tagName = tagName;
}

Container.prototype.render = function () {
    var wrapper = document.createElement(this.tagName);
    wrapper.id = this.id;
    wrapper.className = this.class;
    wrapper.tagName = this.tagName;
    return wrapper;
};

Container.prototype.remove = function () {
    var node = document.getElementById(this.id);
    node.parentElement.removeChild(node);
};

function Menu(id, className, items) {
    Container.call(this, id, className, 'ul');

    this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var ul = document.createElement('ul');

    this.items.forEach(function (item) {
        if (item instanceof Container) {
            ul.appendChild(item.render());
        }
    });

    return ul;
};

function MenuItem(className, title, href, classHref) {
    Container.call(this, null, className, 'li');

    this.title = title;
    this.href = href;
    this.classHref = classHref;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var li = document.createElement('li');
    var link = document.createElement('a');


    link.href = this.href;
    if(this.classHref){
        link.className = this.classHref;
    }

    link.textContent = this.title;

    li.appendChild(link);

    return li;
};

function SuperMenu(className, id, items, title, href) {
    Menu.call(this, className, id, items);
    this.title = title;
    this.href = href;
}

SuperMenu.prototype = Object.create(Menu.prototype);

SuperMenu.prototype.render = function () {
    if (this.title && this.href) {
        var menuItem = new MenuItem(this.href, this.title).render();
        menuItem.appendChild(Menu.prototype.render.call(this));
        return menuItem;
    } else {
        return Menu.prototype.render.call(this);
    }
};

window.onload = function () {
    var items = [
        new MenuItem('Home', 'Home', 'index.html', "active-menu"),


        new SuperMenu('Man', 'Man',[
            new MenuItem('', 'Man', 'product.html',''),

        ], 'Man', 'product.html'),


        new MenuItem('', 'Woman', 'product.html',''),
        new MenuItem('', 'Kids', 'product.html',''),
        new MenuItem('', 'Accoseriese', 'product.html',''),
        new MenuItem('', 'Featured', 'product.html',''),
        new MenuItem('', 'Hot Deals', 'product.html',''),






];

    var menu = new SuperMenu('menu', 'menu', items);

    document.getElementById('main-menu').appendChild(menu.render()).classList.add("menu");
};
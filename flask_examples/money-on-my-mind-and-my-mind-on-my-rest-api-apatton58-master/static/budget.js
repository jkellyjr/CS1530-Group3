var purchases;
var categories;
var today = new Date();

window.onload = getCategories;

function clearForms() {
    var forms = Array.prototype.slice.call(document.forms);
    forms.forEach(
        function(f) {
            var fields = Array.prototype.slice.call(f.getElementsByTagName("input"));
            fields.forEach(
                function(e) {
                    if (e.type != "submit") {
                        e.value = null;
                    }
                }
            );
        }
    );
    document.getElementById("purchDate").value = today.toISOString().split('T')[0];
    var dropdowns = Array.prototype.slice.call(document.getElementsByTagName("select"));
    dropdowns.forEach(
        function(d) {
            while (d.hasChildNodes()) {
                d.removeChild(d.lastChild);
            }
        }
    );
}

function getCategories() {
    var req = new XMLHttpRequest();
    
    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handleCategories(req);
    }

    var url = "/cats";

    req.open("GET", url);
    req.send();
}

function handleCategories(req) {
    if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
            categories = JSON.parse(req.responseText);
            console.log(categories);
            categories = categories.filter(c => c.valid);
            getPurchases();
        }
    }
}

function getPurchases() {
    var req = new XMLHttpRequest();
    
    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handlePurchases(req);
    }

    var url = "/purchases";

    req.open("GET", url);
    req.send();
}

function isCurrentMonth(purchase) {
    pDate = new Date(purchase.date);
    return (pDate.getUTCMonth() == today.getUTCMonth() && pDate.getUTCFullYear() == today.getUTCFullYear());
}

function purchPriceOnly(p) {
    return p.price;
}

function addPurchases(a, b) {
    return a+b;
}

function purchaseTotalToCategory(cat) {
    var newObj = Object.assign({}, cat);
    newObj['spent'] = purchases.filter(p => p.cat_index == cat.index).map(purchPriceOnly).reduce(addPurchases, 0);
    newObj['remaining'] = newObj.limit - newObj.spent;
    return newObj;
}

function clearCatElements() {
    var wrapper = document.getElementById("outerWrapper");
    while (wrapper.hasChildNodes()) {
        wrapper.removeChild(wrapper.lastChild);
    }
}

function addCatElement(cat) {
    var wrapper = document.getElementById("outerWrapper");

    var catEl = document.createElement("div");
    catEl.classList.add("category");
    catEl.id="cat-"+cat.index;

    var title = document.createElement("div");
    title.classList.add("catTitle");
    title.textContent = cat.name;
    catEl.appendChild(title);

    var content;
    if (cat.index == 0) { //Uncategorized
        content = "You have spent $"+cat.spent+" on uncategorized purchases.";
    }
    else {
        if (cat.remaining < 0) {
            content = "You have gone $"+Math.abs(cat.remaining)+" over budget of $"+cat.limit+".";
        }
        else {
            content = "You have $"+cat.remaining+"/$"+cat.limit+" remaining in your budget.";
        }
    }
    var contentEl = document.createElement("div");
    contentEl.textContent = content;
    contentEl.classList.add("catContent");
    catEl.appendChild(contentEl);
    wrapper.appendChild(catEl);
    wrapper.appendChild(document.createElement("br"));

    var optionEl = document.createElement("option");
    optionEl.value = cat.index;
    optionEl.textContent = cat.name;
    document.getElementById("purchCatSel").appendChild(optionEl);

    if (cat.index != 0) {
        optionEl = document.createElement("option");
        optionEl.value = cat.index;
        optionEl.textContent = cat.name;
        document.getElementById("deleteCatSel").appendChild(optionEl);
    }

    
}

function handlePurchases(req) {
    if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {
            clearForms();
            purchases = JSON.parse(req.responseText).filter(isCurrentMonth);
            console.log(purchases);
            categories = categories.map(purchaseTotalToCategory);
            clearCatElements();
            categories.forEach(addCatElement);
        }
    }
}

function postPurch() {
    var argText = "";
    var form = document.getElementById("newPurch");
    argText += "description="+form.elements['desc'].value;
    argText += "&price="+form.elements['price'].value;
    argText += "&date="+form.elements['purchDate'].value;
    argText += "&cat_index="+form.elements['purchCat'].value;

    var req = new XMLHttpRequest();
    
    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handlePost(req);
    }

    var url = "/purchases";
    req.open("POST", url);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    req.send(argText);
    
    return false;
}

function postCat() {
    var argText = "";
    var form = document.getElementById("newCat");
    argText += "name="+form.elements['name'].value;
    argText += "&limit="+form.elements['limit'].value;
    
    var req = new XMLHttpRequest();
    
    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handlePost(req);
    }

    var url = "/cats";
    req.open("POST", url);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    req.send(argText);

    return false;
}

function deleteCat() {
    var argText = "";
    var form = document.getElementById("deleteCat");
    argText += "index="+form.elements['catToDelete'].value;
    
    var req = new XMLHttpRequest();
    
    if (!req) {
        alert("Error creating XMLHTTP instance!");
        return;
    }

    req.onreadystatechange = function() {
        handlePost(req);
    }

    var url = "/cats";
    req.open("DELETE", url);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    req.send(argText);

    return false;
}

function handlePost(req) {
    if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 201 || req.status == 204) {
            console.log(req.responseText);
            getCategories();
        }
    }
}
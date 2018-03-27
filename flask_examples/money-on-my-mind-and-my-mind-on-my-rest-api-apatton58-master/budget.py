from flask import Flask, request, url_for, redirect, session, render_template, g, flash
from flask_restful import Resource, Api, reqparse, abort
import json, datetime

app = Flask(__name__)
api = Api(app)

cats = [{'index': 0, 'name': "Uncategorized", 'limit': 0, 'valid': True}]
purchases = []

cat_parser = reqparse.RequestParser()
cat_parser.add_argument('name', required=True, help="Name cannot be blank!")
cat_parser.add_argument('limit', type=int, required=True, help="Limit cannot be blank!")

cat_del_parser = reqparse.RequestParser()
cat_del_parser.add_argument('index', type=int, required=True)

purch_parser = reqparse.RequestParser()
purch_parser.add_argument('description')
purch_parser.add_argument('price', type=int, required=True)
purch_parser.add_argument('date', required=True)
purch_parser.add_argument('cat_index', type=int, required=True)

@app.route("/")
def root_page():
    return render_template("home.html")

class Categories(Resource):
    def get(self):
        return cats

    def post(self):
        args = cat_parser.parse_args()
        cats.append({'index': len(cats), 'name': args['name'], 'limit': args['limit'], 'valid': True})
        return cats[len(cats)-1], 201

    def delete(self):
        args = cat_del_parser.parse_args()
        print (cats[args['index']])
        cats[args['index']]['valid'] = False;
        for p in purchases:
            if p['cat_index'] == args['index']:
                p['cat_index'] = 0
        return '', 204

class Purchases(Resource):
    def get(self):
        return purchases

    def post(self):
        args = purch_parser.parse_args()
        purchases.append({'description': args['description'], 'price': args['price'], 'date': args['date'], 'cat_index': args['cat_index']})
        return purchases[len(purchases)-1], 201

        

api.add_resource(Categories, '/cats')
api.add_resource(Purchases, '/purchases')

app.secret_key = "hail2pitt"

if __name__ == "__main__":
    app.run()
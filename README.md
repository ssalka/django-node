## Django-Node

A Django/Node.js app adapted from [django-realtime-tutorial](https://github.com/mburst/django-realtime-tutorial).
This project aims to bring the best of both worlds together, utilizing Django for authentication and data management,
while relying on Node.js for access to npm and bundling/pre-compiling. The two communicate with each other via Redis
and Django REST Framework.

*NOTE: This project is highly experimental and intended for use in a development context only - major
components/dependencies of the project are likely to change over time.*

### Installation

To get started, you will need existing installations of Python (this project has been tested only on 3.5), Node.js, and Redis.
Then, make sure all dependencies are installed:

```
git clone https://github.com/ssalka/django-node.git
cd django-node/django
pip install -r requirements.txt
cd ../node
npm install && cd ../
```

And adjust `settings.py` to your liking. Finally, make sure you're running an instance of Redis, as the Node.js entry point attempts
to establish a connection with Redis.

### Running the App

In separate Terminal windows (using folders `./django` and `./node`, respectively), run each
 of the following:

```
python manage.py runserver
npm start
```

Once the front-end code has been bundled by webpack, open up `localhost:8000` to view the app. Django REST
Framework is accessible through the `/api` endpoint.
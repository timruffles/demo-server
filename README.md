# Demo Server

This is a simple server for demoing client-server interaction.

## Checkout

    POST /checkout
    Content-Type: application/json
    { 
      "number": "4444-1111-2222-3333"
    }

Will give a 400 on malformatted or missing card numbers.

## Search

    GET /products

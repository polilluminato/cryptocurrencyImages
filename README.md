# cryptocoinImages

Download all the images from [CoinList](https://www.cryptocompare.com/api/#-api-data-coinlist) public API on [Cryptocompare.com](https://www.cryptocompare.com/) in just one js file.

## Structure

- JSON files
    - [coinlist.json](coinlist.json): this is the file that I downloaded from Coinlist public API;
- Main code
    - [app.js](app.js)
- Result
    - [organized-cryptocurrency.json](organized-cryptocurrency.json): file with the organized info about cryptocurrency images;
    - [images](images): directory with all images.

## Run 

To run the code all you have to do is to clone the repo, install the dependencies: [sync-exec](https://github.com/gvarsanyi/sync-exec/) and [async](https://github.com/caolan/async) and run it with
```
nodejs app.js
```

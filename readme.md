# Todo App

## Run e2e tests
```bash
node nightwatch.js  -t e2e/demo.spec.js  --env=chrome
```

## Take screenshot
```bash
phantomjs screenshot.js http://yahoo.com anoop.png
```

## Install ChromeDriver.
```bash
wget -N http://chromedriver.storage.googleapis.com/2.27/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/
rm ~/chromedriver_linux64.zip
sudo mv -f ~/chromedriver /usr/local/share/
sudo chmod +x /usr/local/share/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
```
[Gist reference](https://gist.github.com/ziadoz/3e8ab7e944d02fe872c3454d17af31a5)
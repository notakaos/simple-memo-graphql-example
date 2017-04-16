# ref. Docker for Mac で 日本語locale設定を含む PostgreSQL を構築 - Qiita
#      http://qiita.com/kisk_tech/items/eb142b2287779e0751ee
FROM postgres:9.6
RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
ENV LANG ja_JP.utf8
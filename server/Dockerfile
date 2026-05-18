FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# ------------------------------------------------
# Base packages
# ------------------------------------------------

RUN apt-get update && apt-get install -y \
    software-properties-common \
    ca-certificates \
    curl \
    wget \
    git \
    unzip \
    zip \
    gnupg2 \
    lsb-release \
    build-essential \
    pkg-config \
    sqlite3 \
    libsqlite3-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------
# PHP repository (Ondrej Surý)
# ------------------------------------------------

RUN add-apt-repository ppa:ondrej/php -y

RUN apt-get update && apt-get install -y \
    php8.4 \
    php8.4-cli \
    php8.4-dev \
    php8.4-common \
    php8.4-mbstring \
    php8.4-xml \
    php8.4-curl \
    php8.4-zip \
    php8.4-intl \
    php8.4-bcmath \
    php8.4-gd \
    php8.4-mysql \
    php8.4-pgsql \
    php8.4-sqlite3 \
    php8.4-opcache \
    php8.4-readline

# ------------------------------------------------
# Composer
# ------------------------------------------------

RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer

# ------------------------------------------------
# Install Go
# ------------------------------------------------

ENV GO_VERSION=1.25.0

RUN wget https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz && \
    rm -rf /usr/local/go && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /var/www/html

COPY . /var/www/html
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html"]

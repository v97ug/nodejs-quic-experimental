FROM ubuntu:18.04

RUN apt update && \
    apt install -y software-properties-common && \
    add-apt-repository ppa:ubuntu-toolchain-r/test && \
    apt update && \
    apt install -y \
      g++ \
      python \
      ccache \
      build-essential \
      git \
      curl \
      python3-distutils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p build && \
    cd build && \
    curl -LkvOf https://nodejs.org/dist/v15.0.0/node-v15.0.0.tar.gz && \
    tar zxf node-v15.0.0.tar.gz && \
    cd node-v15.0.0 && \
    # Build Node.js with QUIC
    ./configure --experimental-quic && \
    # CC='ccache gcc' CXX='ccache g++' make -j2 && \
    ## Install
    # make install PREFIX=/usr/local && \
    make -j4 && \
    mv node /usr/local/bin/ && \
    rm -rf /build

CMD [ "node" ]
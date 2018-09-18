all: build

deps:
	npm install

test: deps
	npm run test

build: test
	npm run build
	@echo "Build success!"
	@echo "Built: 'dist/', 'examples/browser/'"

clean:
	rm -rf ipfs/
	rm -rf ipfs-log-benchmarks/
	rm -rf node_modules/
	rm -rf coverage/
	rm -rf test/keystore/

.PHONY: test

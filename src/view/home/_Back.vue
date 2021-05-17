<template>
  <div>
    123
    <a ref="a" download="keystore.json" id="download">下载</a>
    <input type="file" @change="onChange" />
    <div @click="getBalance">获取余额</div>
    <div>余额：{{ usdt }}</div>
  </div>
</template>

<script>
// import("ethers").then((res) => {
//   console.log(res);
// });
import { ethers } from "ethers";
import usdtAbi from "../../assets/js/usdtAbi";
import vaneAbi from "../../assets/js/vaneAbi";
import BigNumber from "bignumber.js";
const { utils } = ethers;
export default {
  data() {
    return {
      provider: null,
      wallet: null,
      usdt: "",
      address: "",
    };
  },
  methods: {
    createWallet() {
      const privateKey = ethers.utils.randomBytes(32);
      console.log(ethers.utils.bigNumberify(privateKey));
      var wallet = new ethers.Wallet(privateKey);
      console.log(wallet);
    },
    fromMnemonic() {
      if (localStorage.getItem("mnemonic")) {
        // this.exportData();
        return;
      }
      var rand = ethers.utils.randomBytes(16);

      // 生成助记词
      console.log(ethers.utils);
      var mnemonic = ethers.utils.entropyToMnemonic(rand);
      console.log(mnemonic);
      localStorage.setItem("mnemonic", mnemonic);
      var path = "m/44'/60'/0'/0/0";

      // 通过助记词创建钱包
      let res = ethers.Wallet.fromMnemonic(mnemonic, path);
      console.log(res);
      localStorage.setItem("data", JSON.stringify(res));
    },
    async exportData() {
      const privateKey = JSON.parse(localStorage.getItem("data")).signingKey
        .privateKey;
      console.log(privateKey);
      const wallet = new ethers.Wallet(privateKey, this.provider);
      console.log(wallet);
      // const json = await wallet.encrypt("123");
      // var blob = new Blob([json], { type: "text/plain;charset=utf-8" });
      // console.log(this.$refs.a);
      // this.$refs.a.href = window.URL.createObjectURL(blob);
    },
    onChange(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      const _this = this;
      fileReader.onload = async function(e) {
        await _this.fromEncryptedJson(e.target.result || JSON.parse());
      };
      fileReader.readAsText(file);
    },
    async fromEncryptedJson(json) {
      let activeWallet = null;
      if (!this.wallet) {
        const { privateKey } = await ethers.Wallet.fromEncryptedJson(
          json,
          "123"
        );
        // console.log(res);
        const wallet = new ethers.Wallet(privateKey, this.provider);
        activeWallet = wallet.connect(this.provider);
        this.wallet = activeWallet;
        console.log(activeWallet);
      } else {
        activeWallet = this.wallet;
      }

      const balance = await activeWallet.getBalance();
      console.log(balance);
      const transactionCount = await activeWallet.getTransactionCount();
      console.log(transactionCount);
      const res = await activeWallet.sendTransaction({
        to: "0x0211cfff6e6266be70aabf023a6e0b9284b95306",
        value: 0,
        gasPrice: activeWallet.provider.getGasPrice(),
        gasLimit: 21000,
      });
      console.log(res);
    },
    async getBalance() {
      await this.fromEncryptedJson();
    },
    async initContract() {
      const address = "0x61f35FfFbc25CE4C9Bf4c957fA83704d04C40354";
      const tokenAddress = "0x075ce50cb8AdfFf07A6c3566Ca1c3bB2a72c4fe5";
      var contract = new ethers.Contract(address, usdtAbi, this.provider);

      const singer = this.provider.getSigner();
      contract = contract.connect(singer);
      console.log(singer);
      const usdt = await contract.balanceOf(this.address);
      this.usdt = (usdt.toString() / Math.pow(10, 18)).toFixed(2);
      console.log(contract);
      const allowance = await contract.allowance(this.address, tokenAddress);
      // await contract.approve(tokenAddress, "100000000000000000000000000");
      var vaneContract = new ethers.Contract(
        tokenAddress,
        vaneAbi,
        this.provider
      );
      vaneContract = vaneContract.connect(singer);
      console.log(vaneContract);
      try {
        let filterFromMe = vaneContract.filters.Transfer(null, this.address);
        console.log(filterFromMe);
        const res = await vaneContract.queryFilter(
          filterFromMe,
          7336000,
          "latest"
        );
        console.log(res);
        let statusList = await Promise.all(
          res.map((item) =>
            this.provider.getTransactionReceipt(item.transactionHash)
          )
        );
        console.log(statusList);
      } catch (error) {
        console.log(error);
      }
      return;
      // console.log(vaneContract);
      // const res = await vaneContract.filters.Transfer(this.address);
      // console.log(res);
      // const res = await vaneContract.transfer(
      //   "0xf8b233A17dece3dB1Ac3a41919Faa22d4224537f",
      //   "1"
      // );

      // vaneContract.on(filterFromMe, (fromAddress, toAddress, value, event) => {
      //   console.log("I sent", value, fromAddress, toAddress, event);
      // });
      // console.log(res);
      try {
        const res = await vaneContract.buyCoinByUsdt(
          BigNumber(10 * 1000000000000000000).toString(10)
          // { gasPrice: ethers.utils.parseUnits("3", "gwei") || 606250, nonce: 0 }
        );
        console.log(res, new Date());
        setInterval(() => {});
      } catch (error) {
        console.log(error);
      }
    },
    async getAddress() {
      const signer = this.provider.getSigner();
      this.address = await signer.getAddress();
      console.log(this.address);
    },
    async getLogs() {
      const res = await this.provider.getLogs({});
      console.log(res);
    },
  },
  async mounted() {
    console.log(ethereum, web3.currentProvider);
    let provider = new ethers.providers.Web3Provider(web3.currentProvider); // ethers.JsonRpcProvider();
    this.provider = provider;
    console.log(provider);
    await ethereum.enable();
    await this.getAddress();
    // await this.getLogs();
    // await this.createWallet();
    await this.fromMnemonic();
    await this.initContract();
    let etherscanProvider = new ethers.providers.EtherscanProvider();
    // const res = await etherscanProvider.getHistory(this.address);
    console.log(etherscanProvider);
    //0x791531c38f9ad4c51f654c9613e854e9f8ee80ebc41e2611e6f874d08685589b
    //获取交易状态
    // console.log(
    //   await this.provider.getTransactionReceipt(
    //     "0x791531c38f9ad4c51f654c9613e854e9f8ee80ebc41e2611e6f874d08685589b"
    //   )
    // );
    // console.log(await provider.listAccounts());
  },
};
</script>

<style></style>

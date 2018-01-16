<template>
	<div>
		<div class="content alert alert-primary">
			<div :class="msgClass" v-for="(item, index) in messages">
				<div>{{ item }}</div>
			</div>
			<div class="alert alert-secondary">
				<div>{{ msg }}</div>
			</div>
		</div>
		<div class="form-group">
			<label>Введите сообщение</label>
			<input ref="inputText" type="text" 
			class="form-control" v-model="msg">
		</div>
		<button class="btn btn-warning" @click="sendMsg">Отправить</button>
		<button class="btn btn-success" @click="showSmile">Смайлы</button>
		<span class="smiles" v-if="activeSmile" v-for="(smile, index) in smiles">
			<i :class="smile" @click="addSmile(index)"></i>
		</span>
	</div>	
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		data(){
			return {
				msg: '',
				msgClasses: [],
				activeSmile: false,
				activated: null,
				smiles: [
				"fa fa-frown-o",
				"fa fa-meh-o",
				"fa fa-smile-o",
				"fa fa-thumbs-up"
				]
			}			
		},
		computed: {
			...mapGetters([
				'messages',
				'botActiveSpeak'
				]),
			msgClass(){
				for (let i = 0; i < this.msgClasses.length; i++) {
					if (this.msgClasses[i] == true ) {
						return "alert alert-warning";
					} else if (this.msgClasses[i] == false) {
						return "alert alert-success";
					}
				}
			},
		},
		methods: {
			showSmile() {
				this.activeSmile = !this.activeSmile;
			},
			addSmile(index) {
				let innerSmile = '<i class="' + this.smiles[index] + '" ></i>'
				this.$refs.inputText.value = this.insertText('&#x263A;');
			},
			insertText(text) {
				let scrollPos = this.$refs.inputText.scrollTop;
				let caretPos = this.$refs.inputText.selectionStart;
				let front = (this.$refs.inputText.value).substring(0, caretPos);
				let back = (this.$refs.inputText.value).substring(this.$refs.inputText.selectionEnd, this.$refs.inputText.length);
				this.$refs.inputText.value = front + text + back;
				caretPos = caretPos + this.$refs.inputText.length;
				this.$refs.inputText.selectionStart = caretPos;
				this.$refs.inputText.selectionEnd = caretPos;
				this.$refs.inputText.focus();
				this.$refs.inputText.scrollTop = scrollPos;
				return this.$refs.inputText.value;
			},
			sendMsg() {
				let pattern = /^[\s]+$/;
				if (!pattern.test(this.msg)) {
					this.activated = true;
					this.messages.push(this.msg);
					this.msgClasses.push(true);
					this.$store.dispatch('sendBotMsg', this.msgClasses);
					this.msg = "";
				}				
			},
		},
		components: {

		}
	}
</script>
<style scoped>
	.smiles {
		font-size: 22px;
	}
	i {
		padding: 0 4px;
	}
	input { 
		font-family: 'FontAwesome';

	}
	.content {
		overflow: auto;
		height: 300px;
		background-color: #fff;
	}
</style>
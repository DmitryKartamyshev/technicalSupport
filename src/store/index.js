import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		messages: [],
		botActiveSpeak: false,
		greetings: ["прив", "здрав", "добр"],
		request: [
		{
			helloMsg: "прив",
			advice: "Привет!"
		},
		{
			helloMsg: "здрав",
			advice: "Здравствуйте!"	
		},
		{
			helloMsg: "добр",
			advice: "Добрый"
		}],
		problems: [
		{
			problem: "не приходят",
			problSubj: "данные",
			solution: "Убедитесь в правильности введённых данных"
		},
		{
			problem: "не приходят",
			problSubj: "таблиц",
			solution: "На сервере ведутся работы, подождите некоторое время"
		}
		]
	},
	getters: {
		messages(state) {
			return state.messages;
		},
		botActiveSpeak(state) {
			return state.botActiveSpeak;
		}
	},
	mutations: {
		setBtn(state) {
			state.sendBtnActive = false;
			console.log(1);
		},
		addBotMsg(state) {
			let lastMsg = state.messages[state.messages.length - 1].toLowerCase();

			for (let i = 0; i < state.request.length; i++) {
				for (let j = 0; j < state.problems.length; j++) {
					
					if (~lastMsg.indexOf(state.request[i].helloMsg) && ~lastMsg.indexOf(state.problems[j].problem)) {
						if (~lastMsg.indexOf(state.problems[j].problSubj)) {
							let strFullAnswer = state.request[i].advice + ' ' + state.problems[j].solution;
							state.messages.push(strFullAnswer);
							return;
						} 
					} 
					else if (~lastMsg.indexOf(state.request[i].helloMsg)) {

						let strUser = state.request[i].helloMsg;
						let strBot = state.request[i].advice;
						if (strUser === "добр") {
							let date = new Date();
							let hour = (date.getHours() >= 17) ? 'вечер' : 'день';
							let time = "Добрый " + hour;
							strBot = time;
							state.messages.push(strBot);
							return;
						} 
						else {
							state.messages.push(strBot);
							return;
						}
					}					
					else if (~lastMsg.indexOf(state.request[i].helloMsg) && ~lastMsg.indexOf(state.problems[j].problem)) {
						
						if (~lastMsg.indexOf(state.problems[j].problSubj)) {
							let strFullAnswer = state.request[i].advice + ' ' + state.problems[j].solution;
							state.messages.push(strFullAnswer);
							return;
						} 

					} 
					else if (~lastMsg.indexOf(state.problems[j].problem)) {

						if (~lastMsg.indexOf(state.problems[j].problSubj)) {
							let strAnswer = state.problems[j].solution;
							state.messages.push(strAnswer);
							return;
						}		
					} 
					else if (~lastMsg.indexOf('пока') || (~lastMsg.indexOf('до свидания'))) {
						state.messages.push("До скорой встречи. Благодарим за внимание!");
						return;
					}
					else  {
						state.messages.push("Я вас не понимаю");
						return;
					} 
				}
			}
		},
		resBotMsg(state) {
			state.botActiveSpeak = false;
		}
	},
	actions: {
		sendBotMsg(store, payLoad){
			setTimeout(() => {
				store.commit('addBotMsg');
				payLoad.push(false);
			}, 1000);
			store.commit('resBotMsg');
		}
	},
	plugins: [createPersistedState()],
	strict: process.env.NODE_ENV !== 'production'
});
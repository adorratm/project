<template>
	<v-row>
		<v-col
			cols="12"
			sm="12"
			md="6"
			offset-md="3"
			lg="6"
			offset-lg="3"
			xl="6"
			offset-xl="3"
		>
			<h1 class="text-center">Kayıt Formu</h1>
			<ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
				<form @submit.prevent="handleSubmit(onRegister)" ref="userRegister">
					<ValidationProvider
						v-slot="{ errors }"
						name="Adınız ve Soyadınız"
						rules="required|max:70"
					>
						<v-text-field
							v-model="name"
							:counter="70"
							:maxlength="70"
							:error-messages="errors"
							label="Adınız ve Soyadınız"
							required
						></v-text-field>
					</ValidationProvider>
					<ValidationProvider
						v-slot="{ errors }"
						name="Telefon Numaranız"
						rules="required|digits:11"
					>
						<v-text-field
							v-model="phoneNumber"
							:counter="11"
							:error-messages="errors"
							label="Telefon Numaranız"
							:minlength="11"
							:maxlength="11"
							required
						></v-text-field>
					</ValidationProvider>
					<ValidationProvider
						v-slot="{ errors }"
						name="E-mail Adresiniz"
						rules="required|email"
					>
						<v-text-field
							v-model="email"
							:error-messages="errors"
							label="E-mail Adresiniz"
							required
						></v-text-field>
					</ValidationProvider>
					<ValidationProvider
						v-slot="{ errors }"
						name="Şifreniz"
						rules="required|min:6"
					>
						<v-text-field
							v-model="password"
							:minlength="6"
							:error-messages="errors"
							type="password"
							label="Şifreniz"
							required
						></v-text-field>
					</ValidationProvider>
					<ValidationProvider
						v-slot="{ errors }"
						name="Tekrar Şifreniz"
						rules="required|min:6"
					>
						<v-text-field
							v-model="passwordrpt"
							:minlength="6"
							:error-messages="errors"
							label="Tekrar Şifreniz"
							type="password"
							required
						></v-text-field>
					</ValidationProvider>
					<v-btn class="mr-4" color="primary" type="submit" :disabled="invalid">
						Kayıt Ol
					</v-btn>
					<v-btn @click="clear" color="error">
						Temizle
					</v-btn>
				</form>
			</ValidationObserver>
		</v-col>
	</v-row>
</template>

<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";
	export default {
		components: {
			ValidationObserver,
			ValidationProvider
		},
		data() {
			return {
				name: null,
				email: null,
				password: null,
				passwordrpt: null,
				phoneNumber: null
			};
		},
		methods: {
			isEmpty(obj) {
				if (typeof obj == "number") return false;
				else if (typeof obj == "string") return obj.length == 0;
				else if (Array.isArray(obj)) return obj.length == 0;
				else if (typeof obj == "object")
					return obj == null || Object.keys(obj).length == 0;
				else if (typeof obj == "boolean") return false;
				else return !obj;
			},
			clear() {
				this.name = null;
				this.phoneNumber = null;
				this.email = null;
				this.password = null;
				this.passwordrpt = null;
			},
			/**
			 * User Register Method
			 */
			onRegister() {
				let formData = new FormData(this.$refs.userRegister);
				this.$store.dispatch("RegisterUser", formData).then(response => {
					if (response.success) {
						this.$izitoast.success({
							title: response.title,
							message: response.msg,
							position: "topCenter"
						});
					} else {
						this.$izitoast.error({
							title: response.title,
							message: response.msg,
							position: "topCenter"
						});
					}
				});
			}
		}
	};
</script>

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
			<h1 class="text-center">Giriş Formu</h1>
			<ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
				<form @submit.prevent="handleSubmit(onSubmit)" ref="userLogin">
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
					<v-btn class="mr-4" color="primary" type="submit" :disabled="invalid">
						Giriş Yap
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
				email: null,
				password: null
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
				this.email = null;
				this.password = null;
			},
			async onSubmit() {
				let formData = new FormData(this.$refs.userLogin);
				try {
					let response = await this.$auth.loginWith("user", {
						data: formData
					});
					if (response.data.success) {
						this.$izitoast.success({
							title: response.data.title,
							message: response.data.msg,
							position: "topCenter"
						});
						this.$auth.setUser(response.data.user);
						this.$auth.$storage.setUniversal("user", response.data.user);
						this.$auth.strategy.token.set(
							this.$auth.$storage.getUniversal("user").api_token
						);
						setTimeout(event => {
							if (!this.isEmpty(this.$route.query.url)) {
								window.location.href = decodeURIComponent(this.$route.query.url);
							} else {
								this.$router.go(decodeURIComponent("/profile"));
							}
						}, 2000);
					} else {
						this.$izitoast.error({
							title: response.data.title,
							message: response.data.msg,
							position: "topCenter"
						});
					}
				} catch (err) {
					console.log(err);
				}
			}
		}
	};
</script>

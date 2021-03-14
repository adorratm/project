<template>
	<v-app>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-btn
				icon
				@click.stop="miniVariant = !miniVariant"
				class="d-none d-sm-none d-md-inline-flex d-lg-inline-flex d-xl-inline-flex"
			>
				<v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
			</v-btn>
			<v-btn
				icon
				@click.stop="clipped = !clipped"
				class="d-none d-sm-none d-md-inline-flex d-lg-inline-flex d-xl-inline-flex"
			>
				<v-icon>mdi-application</v-icon>
			</v-btn>
			<v-btn
				icon
				@click.stop="fixed = !fixed"
				class="d-none d-sm-none d-md-inline-flex d-lg-inline-flex d-xl-inline-flex"
			>
				<v-icon>mdi-minus</v-icon>
			</v-btn>
			<v-toolbar-title>
				<nuxt-link to="/">
					<v-img
						class="ml-2"
						width="151"
						height="50"
						lazy-src="/digitus.webp"
						src="/digitus.webp"
					></v-img>
				</nuxt-link>
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon @click.stop="rightDrawer = !rightDrawer">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
		<v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
			<v-list>
				<v-list-item @click.native="right = !right">
					<v-list-item-action>
						<v-icon>
							mdi-repeat
						</v-icon>
					</v-list-item-action>
					<v-list-item-title>Pozisyonu Değiştir</v-list-item-title>
				</v-list-item>
				<v-list-item to="/register">
					<v-list-item-icon>
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Kayıt Ol</v-list-item-title>
				</v-list-item>
				<v-list-item to="/login">
					<v-list-item-icon>
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Giriş Yap</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-footer
			:absolute="!fixed"
			app
			v-ripple="{ center: true }"
			class="text-center justify-center"
		>
			<span v-ripple="{ center: true }" class="text-center"
				>&copy; {{ new Date().getFullYear() }}. Bu Proje Emre KILIÇ Tarafından
				Digitus Technology İş Başvurusu İçin Geliştirilmiştir.</span
			>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: false,
				items: [
					{
						icon: "mdi-apps",
						title: "Anasayfa",
						to: "/"
					},
					{
						icon: "mdi-chart-bubble",
						title: "Inspire",
						to: "/inspire"
					}
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: "Project For Digitus Technology"
			};
		}
	};
</script>

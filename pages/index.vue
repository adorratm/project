<template>
	<v-row>
		<v-col
			cols="12"
			sm="10"
			md="8"
			lg="8"
			xl="8"
			offset-sm="1"
			offset-md="2"
			offset-lg="2"
			offset-xl="2"
		>
			<h1>User Login Feature for Web Application</h1>
			<br />
			<h3><b>Scenario:</b></h3>
			<p>
				Your are requested to design and implement user login and authentication
				feature for an Internet facing web application. In addition to standard
				login, the users should be able to register to the site using their
				name, surname, email and password. After entering these information, a
				verification email should be sent to the user, containing the activation
				code. Users are not allowed to login without entering their verification
				code after registration. Also, there must be a mechanism for users to
				retrieve their passwords in case they lose their passwords.
			</p>
			<br />
			<br />
			<br />
			<p>Site administrators should be able to access the following reports:</p>
			<ul>
				<li>
					How many users are online - How many new users are successfully
					registered within a time period (e.g. 1 day)
				</li>
				<li>
					How many users are sent a verification code but did not register after
					1 day
				</li>
				<li>
					How long it takes to complete login (in seconds, average for a given
					day)
				</li>
			</ul>
			<br />
			<br />
			<br />
			<h3><b>Deliverables:</b></h3>
			<ul>
				<li>
					Design Document (should include assumptions, design decisions,
					workflow and test scenarios) – can be a simple text file
				</li>
				<li>Source Code</li>
				<li>
					Database Script (should include appropriate CREATE statements for
					creating required tables & procedures, sample data optional)
				</li>
			</ul>
			<br />
			<br />
			<br />
			<h3><b>Notes:</b></h3>
			<ul>
				<li>
					You can include any info necessary to the design document
				</li>
				<li>
					You can use any language, development environment (IDE) and database
					(describe in design document)
				</li>
				<li>
					Make sure that the source code does not contain any compilation errors
					- Do NOT send database files (.mdf, .dat, etc...)
				</li>
			</ul>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		components: {}
	};
</script>

# Gestion Admin 

Example project using : Spring Boot 2 with jdk 11 and JWT Authentication as Rest Api + Angular 8+ with a bootstrap 4 template.

# Getting Started 

Steps to compile, build and deploy with using maven plugin.

## Part One : Angular 

### Step 1 : Change path `build : outputpath` in file `angular.json` 

We modify output build result to integrate our front with the back end.

		"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "../api-gestion/src/main/resources/static/app",
            "index": "src/index.html",
            "main": "src/main.ts",

### Step 2 : Compile and Build

##### Add `build:prod` goal in `package.json`

 `ng build` : compiles the application into an output directory.

 `--prod`  : tells Angular to make our application much smaller.

 `--baseHref` : Set baseHref to /gestion-admin/app/ because we will deploy it under /gestion-admin/app/ 

		{
		"name": "angular-fatca",
		"version": "0.0.0",
		"scripts": {
		"ng": "ng",
		"start": "ng serve",
		"build": "ng build",
		"build:prod": "ng build --prod --base-href /gestion-admin/app/",
		"test": "ng test",
		"lint": "ng lint",
		"e2e": "ng e2e"
		},
		
##### There are two ways to build .
  	
  	Compiles an Angular app into an output directory at the given output path. Must be executed from within a workspace directory

		# using the npm scripts
		npm run build
		# using the cli directly
		ng build --prod


##### Add apiUrl in files `environment.ts` and `environement.prod.ts` 

A project's src/environments/ folder contains the base configuration file, environment.ts, which provides a default environment. You can add override defaults for additional environments, such as production and staging, in target-specific configuration files.

### Environement.ts

	export const environment = {
	production: false,
	apiUrl: 'http://localhost:8080/api'
	};
  
### Environement.prod.ts
  
	export const environment = {
	production: false,
	apiUrl: 'http://localhost:8081/gestion-admin/api'
	};

## Part Two : Spring 

##### Add class `WebMvcConfig`

It is a Controller definition to return a view.

`@Configuration` tags the class as a source of bean definitions for the application context.

I should have a @Configuration class that implements WebMvcConfigurer.

		@Configuration
		public class WebMvcConfig implements WebMvcConfigurer {
	    @Override
	    public void addViewControllers(ViewControllerRegistry registry) {
	    	 registry.addViewController("/").setViewName("redirect:app/index.html");
	        //registry.addViewController("/").setViewName("forward:/app/index.html");
	    }
		}


### Step 2 : Deploy using maven plugin

##### Declare a Maven Tomcat plugin.

		<plugin>
			<groupId>org.apache.tomcat.maven</groupId>
			<artifactId>tomcat7-maven-plugin</artifactId>
			<version>2.2</version>
			<configuration>
				<url>http://localhost:8080/manager/text</url>
				<server>TomcatServer</server>
				<path>/gestion-admin</path>
			</configuration>
	    </plugin>

##### Add above Tomcat’s user in the Maven setting file, later Maven will use this user to login Tomcat server ,in path `%MAVEN_PATH%/conf/settings.xml`.

		 <server>
		    <id>tomcat</id>
		      <username>tomcat</username>
		     <password>123456</password>
	     </server>	   


##### Add an user with roles `manager-gui` and `manager-script` in path  `%TOMCAT7_PATH%/conf/tomcat-users.xml`

        <user username="tomcat" password="123456" roles="manager-gui,manager-script"/>


##### Take the compiled code and package it in its distributable format `WAR` (in target) with this command : 

		mvn package

##### Commands to manipulate WAR file on Tomcat.
   
    	mvn tomcat7:deploy 


## Part three : Authentification

#### With `Spring Security Basic`

+ [**My Project Spring basic Authentification**](https://github.com/SallakImane/spring-basic-auth)

+ [**Spring Boot Basic Authentication**](https://medium.com/@rameez.s.shaikh/angular-7-spring-boot-basic-authentication-example-98455b73d033)

#### With `JWT` 

+ [**Spring Security with JWT**](https://dev.to/keysh/spring-security-with-jwt-3j76)

+ [**Proof of authentication with JWT**](https://blog.ippon.fr/2017/10/12/preuve-dauthentification-avec-jwt/)

+ [**JSON Web Tokens**](https://jwt.io)

+ [**Putting RxJS into practice in Angular**](https://makina-corpus.com/blog/metier/2017/premiers-pas-avec-rxjs-dans-angular)

###### With `Postman` 

+ [**How to send JSON Web Token (JWT Token) as header with Postman**](https://www.youtube.com/watch?v=SKswJH7_plQ)

## Part foor : Send header authorization with token for each request `(Create an Interceptor )`

The goal is to include the JWT which is in local storage as the `Authorization` header in any HTTP request that is sent. The first step is to create an interceptor. To do this, create an `Injectable` class which implements 

`HttpInterceptor`.

+ [**Angular Authentication: Using the Http Client and Http Interceptors**](https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8)

## Part Five : Spring Data `Jpa Audit`

+ [**Spring Data's @JpaAuditing Example**](https://rashidi.github.io/spring-boot-data-audit/)

## Part Six : Integrate `MailGun` with Spring 

First step, you must create an account in mailgun to retrieve the (key domain ....), after insert the code into the application.yml file.You can get the details from MailGun Dashboard.

+ [**Mailgun Setup**](https://documentation.onesignal.com/docs/mailgun-setup)

After Integrate in pom.xml dependency `unirest-java`.

+ [**Unirest-Java**](http://kong.github.io/unirest-java/#requests)

+ [**Set Timeouts with Unirest for Java**](https://howtoprogram.xyz/2017/01/01/set-timeouts-unirest-java/)

Then create Playload Response to confirm whether the email is sent or not , example if testing sendTestMail() inside service MailService with @Test you have as response `{"status":200,"message":"OK"}` in console .

Finally mailGun EmailService Custom Implementation, and class EmailDTO.

+ [**Integrate MailGun with Spring Boot and Java App**](https://vitalflux.com/integrate-mailgun-spring-boot-java-app/)

## Part Seven : Continuous Integration `Jenkins `

+ [**Jenkins**](https://www.guru99.com/download-install-jenkins.html)

+ [**How to trigger a Jenkins build process by a GitHub push**](https://learning-continuous-deployment.github.io/jenkins/github/2015/04/17/github-jenkins/)

+ [**Triggering a Jenkins build from a push to Github**](https://medium.com/@marc_best/trigger-a-jenkins-build-from-a-github-push-b922468ef1ae)

+ [**Jenkins Pipeline**](https://www.guru99.com/jenkins-pipeline-tutorial.html)

#### `DNS dynamique(DynDNS) `

+ [**DNS dynamique(DynDNS): simplified remote access**](https://www.ionos.fr/digitalguide/serveur/know-how/quest-ce-que-le-ddns-dns-dynamique/)

[**Free Dynamic DNS : Getting Started Guide**](https://www.noip.com/support/knowledgebase/getting-started-with-no-ip-com/)

# Authors

 + [**Sallak Imane**](https://github.com/SallakImane)
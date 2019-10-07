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

# Authors
 + [**Sallak Imane**](https://github.com/SallakImane)
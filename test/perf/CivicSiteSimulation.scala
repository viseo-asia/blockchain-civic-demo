package civic

import scala.concurrent.duration._
import scala.util.Random

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

// Simulation Modularization
// http://gatling.io/docs/1.5.6/user_documentation/tutorial/advanced_usage.html

class CivicSiteSimulation extends Simulation {

  // val apiKey = System.getProperty("API_KEY")
  // TODO:rudijs check if apiKey is null and throw/exit

	//val httpProtocol = http.baseURL(System.getProperty("API_URL"))
  // val apiUrl = Option(System.getProperty("API_URL")).getOrElse("http://127.0.0.1:3000")
  val apiUrl = Option(System.getenv("API_URL")).getOrElse("http://127.0.0.1:3000")

	val httpProtocol = http.baseURL(apiUrl)

  // val emailAddressFeeder = Iterator.continually(Map("email" -> (Random.alphanumeric.take(20).mkString + "@example.com")))
  // val policyNumberFeeder = Iterator.continually(Map("policyNumber" -> (Random.alphanumeric.take(8).mkString)))

	val scenario1 = scenario("HomePageSimulation")
    // .feed(emailAddressFeeder)
    // .feed(policyNumberFeeder)
    // .exec(_.set("apiKey", apiKey))
    .exec(HomePage.request)

	setUp(
    // scenario1.inject(
      // atOnceUsers(20),
      // rampUsers(100) over(5 seconds),
      // nothingFor(5 seconds),
      // rampUsers(100) over(10 seconds),
      // nothingFor(2 seconds),
      // rampUsers(100) over(20 seconds)
    // ).protocols(httpProtocol)
    scenario1.inject(
     atOnceUsers(10),
     rampUsers(600) over(60 seconds)).protocols(httpProtocol)
  )

}

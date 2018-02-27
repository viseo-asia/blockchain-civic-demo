package civic

import io.gatling.core.Predef._
import io.gatling.http.Predef._

object HomePage {
  val request = exec(
    http("request_0_home_page")
      .get("/")
      .check(status.is(200))
    )
}
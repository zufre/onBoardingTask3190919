using System.Web.Mvc;

namespace efTest3190919.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return Redirect("/Sales");
        }

       

      
    }
}
using System.Linq;
using System.Web.Mvc;
using efTest3190919.Models;

namespace efTest3190919.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        private OnboardingProjectEntities db = new OnboardingProjectEntities();
        public JsonResult GetCustomers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Customers.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
         public JsonResult Create(Customer customer)
         {

             Customer cust = new Customer();
             cust.Name = customer.Name;
             cust.Address = customer.Address;
             db.Customers.Add(cust);
             db.SaveChanges();
             return Json(customer, JsonRequestBehavior.AllowGet);
         }
        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Customer customer)
        {
            var cust = db.Customers.Find(customer.Id);
            cust.Name = customer.Name;
            cust.Address = customer.Address;
            db.SaveChanges();
            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Customer cust = db.Customers.Find(id);
            db.Customers.Remove(cust);
            db.SaveChanges();
            return Json(cust, JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

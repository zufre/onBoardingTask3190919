using System.Linq;
using System.Net;
using System.Web.Mvc;
using efTest3190919.Models;

namespace efTest3190919.Controllers
{
    [Route("api/[controller]")]
    public class SalesController : Controller
    {
        private OnboardingProjectEntities db = new OnboardingProjectEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetSales()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Sales.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]

        public JsonResult Create(Sale sale)
        {

            Sale sl = new Sale();
            sl.CustomerId = sale.CustomerId;
            sl.ProductId = sale.ProductId;
            sl.StoreId = sale.StoreId;
            sl.DateSold = sale.DateSold;
            db.Sales.Add(sl);
            db.SaveChanges();
            return Json(sale, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id, ProductId, CustomerId, StoreId, DateSold")] Sale sale)
        {

            var sl = db.Sales.Find(sale.Id);

            sl.CustomerId = sale.CustomerId;
            sl.ProductId = sale.ProductId;
            sl.StoreId = sale.StoreId;
            sl.DateSold = sale.DateSold;
            db.SaveChanges();
            return Json(sale, JsonRequestBehavior.AllowGet);

        }
        
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sale sale = db.Sales.Find(id);
            if (sale == null)
            {
                return HttpNotFound();
            }
            return View(sale);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Sale sl = db.Sales.Find(id);
            db.Sales.Remove(sl);
            db.SaveChanges();
            return Json(sl, JsonRequestBehavior.AllowGet);
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

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using efTest3190919.Models;

namespace efTest3190919.Controllers
{
    [Route("api/[controller]")]
    public class StoresController : Controller
    {
        private OnboardingProjectEntities db = new OnboardingProjectEntities();
          public ActionResult Index()
          {
              return View();
          }
        public JsonResult GetStores()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Stores.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult Create(Store store)
        {
            Store str = new Store();
            str.Name = store.Name;
            str.Address = store.Address;
            db.Stores.Add(str);
            db.SaveChanges();
            return Json(store, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }
        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Store store)
        {
            var str = db.Stores.Find(store.Id);
            str.Name = store.Name;
            str.Address = store.Address;
            db.SaveChanges();
            return Json(store, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Store str = db.Stores.Find(id);
            db.Stores.Remove(str);
            db.SaveChanges();
            return Json(str, JsonRequestBehavior.AllowGet);
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

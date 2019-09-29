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

        /*  // GET: Stores
          public ActionResult Index()
          {
              return View(db.Stores.ToList());
          }
  */
        /* // GET: Stores/Details/5
         public ActionResult Details(int? id)
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
         }*/
        // GET: Customers/GetCustomers
        public JsonResult GetStores()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Stores.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        /*  // GET: Stores/Create
          public ActionResult Create()
          {
              return View();
          }
  */
        // POST: Stores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        /* [HttpPost]
         [ValidateAntiForgeryToken]
         public ActionResult Create([Bind(Include = "Id,Name,Address")] Store store)
         {
             if (ModelState.IsValid)
             {
                 db.Stores.Add(store);
                 db.SaveChanges();
                 return RedirectToAction("Index");
             }

             return View(store);
         }*/

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
        // GET: Stores/Edit/5
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

        // POST: Stores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        /* [HttpPost]
         [ValidateAntiForgeryToken]
         public ActionResult Edit([Bind(Include = "Id,Name,Address")] Store store)
         {
             if (ModelState.IsValid)
             {
                 db.Entry(store).State = EntityState.Modified;
                 db.SaveChanges();
                 return RedirectToAction("Index");
             }
             return View(store);
         }*/
        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Store store)
        {


            var str = db.Stores.Find(store.Id);

            str.Name = store.Name;
            str.Address = store.Address;
            db.SaveChanges();
            return Json(store, JsonRequestBehavior.AllowGet);


        }
        /* // GET: Stores/Delete/5
         public ActionResult Delete(int? id)
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
 */
        /*// POST: Stores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Store store = db.Stores.Find(id);
            db.Stores.Remove(store);
            db.SaveChanges();
            return RedirectToAction("Index");
        }*/
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

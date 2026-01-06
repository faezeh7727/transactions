
const UploadBtn = document.querySelector(".upload-btn");
const TransContainer = document.querySelector(".transactions-container");

let Alldata = [];

function renderTable(data) {
  const Tbody = document.getElementById("transactionsBody");
  Tbody.innerHTML = "";

  data.forEach((item, index) => {
    const date = new Date(item.date).toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.type}</td>
      <td>${item.price.toLocaleString()}</td>
      <td>${item.refId}</td>
      <td>${date}</td>
    `;
    Tbody.appendChild(row);
  });
}

UploadBtn.addEventListener("click", () => {
  axios.get("http://localhost:3000/transactions")

  .then((res) => {
    Alldata = res.data;

    TransContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("transactions-container");

    div.innerHTML = `
      <form>
        <input type="text" class="serach-input" placeholder="جستجو بر اساس شماره پیگیری" />
      </form>
      <div class="list-container">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr class="titels">
                <th>ردیف</th>
                <th>نوع تراکنش</th>
                <th class="sortable" data-sort="price">مبلغ
                <i class="bi bi-chevron-compact-down icon"></i>
                </th>
                <th>شماره پیگیری</th>
                <th>تاریخ تراکنش</th>
              </tr>
            </thead>
            <tbody id="transactionsBody"></tbody>
          </table>
        </div>
      </div>
    `;

    TransContainer.appendChild(div);
    renderTable(Alldata)  ;  
    
    //sort price
    
    const priceTh=div.querySelector('th[data-sort="price"]')

    priceTh.addEventListener("click",()=>{

      axios.get("http://localhost:3000/transactions?_sort=price&_order=asc")

      .then((res)=>{

        Alldata=res.data;

        renderTable(Alldata);

         priceTh.classList.add("asc");
      })
    })

    const searchInput = div.querySelector(".serach-input");

    searchInput.addEventListener("input", (event) => {
      const value = event.target.value.trim();

      const filteredData = Alldata.filter((item) =>
        item.refId.toString().includes(value)
      );

      renderTable(filteredData);
    });
  });
});


"use strict";

function MakeTreeW3Example (id) {
    var example = `
    <ul id="myUL">
      <li><span class="caret">Beverages</span>
        <ul class="nested">
          <li>Water</li>
          <li>Coffee</li>
          <li><span class="caret">Tea</span>
            <ul class="nested">
              <li>Black Tea</li>
              <li>White Tea</li>
              <li><span class="caret">Green Tea</span>
                <ul class="nested">
                  <li>Sencha</li>
                  <li>Gyokuro</li>
                  <li>Matcha</li>
                  <li>Pi Lo Chun</li>
                </ul>
              </li>
            </ul>
          </li>  
        </ul>
      </li>
    </ul>`;
    document.getElementById(id).innerHTML = example;
    var toggler = document.getElementById(id).getElementsByClassName("caret");
    for (var i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
        });
    }
}
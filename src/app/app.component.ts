import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
declare var $;
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public downloadPdf() {
    var data = document.getElementById('pdfDownload');
    $('pdfOpenHide').attr('hidden', true);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('new-file.pdf');
      window.open(
        pdf.output('bloburl', { filename: 'new-file.pdf' }),
        '_blank'
      );
    });
  }
}

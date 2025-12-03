import jszip from 'jszip';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import DataTable from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import languageTR from './datatables.i18n.tr.js';

import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';

pdfmake.addVirtualFileSystem(pdfFonts);

DataTable.Buttons.jszip(jszip);
DataTable.Buttons.pdfMake(pdfmake);
DataTable.util.diacritics((d) => d);

DataTable.defaults.language = languageTR;
DataTable.defaults.buttons = [];
DataTable.defaults.layout = {
  topStart: 'buttons',
  topEnd: 'search',
  bottomStart: 'info',
  bottomEnd: { paging: { firstLast: false } },
};
DataTable.Buttons.defaults.dom.button.className = 'btn btn-lg';
DataTable.ext.classes = {
  ...DataTable.ext.classes,
  search: {
    input: 'input',
    container: 'flex items-center gap-2',
  },
  container: 'dt-container clear-both relative',
  layout: {
    row: 'dt-layout-row flex items-center justify-between w-full my-3 mx-0',
    cell: 'dt-layout-cell flex items-center justify-between',
    start: 'dt-layout-start justify-start mr-auto',
    end: 'dt-layout-end justify-end ml-auto',
    full: 'dt-layout-full w-full',
    tableCell: '',
    tableRow: 'dt-layout-table',
  },
  paging: {
    active: 'btn-primary',
    button: 'join-item btn',
    container: '',
    disabled: 'btn-disabled',
    nav: 'join',
  },
  table: 'min-w-full align-middle whitespace-nowrap table',
  thead: {
    row: '',
    cell: '',
  },
  tbody: {
    row: '',
    cell: '',
  },
  tfoot: {
    row: '',
    cell: '',
  },
};

Object.assign(DataTable.ext.renderer, {
  pagingButton: {
    _: function (settings, buttonType, content, active, disabled) {
      let classes = settings.oClasses.paging;
      let btnClasses = [classes.button];
      let btn;

      if (active) {
        btnClasses.push(classes.active);
      }

      if (disabled) {
        btnClasses.push(classes.disabled);
      }

      if (buttonType === 'ellipsis') {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.disabled = true;
        btn.className = 'join-item btn btn-disabled';
        btn.innerHTML = content;
      } else {
        btn = document.createElement('button');
        btn.className = btnClasses.join(' ');
        btn.role = 'link';
        btn.type = 'button';
        btn.innerHTML = content;
      }

      return {
        display: btn,
        clicker: btn,
      };
    },
  },
});

export default DataTable;

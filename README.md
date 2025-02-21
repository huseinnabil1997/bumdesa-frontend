<!-- - node js 14.x (suggestion v14.17.3)
- npm 6+
- MUI minimal template V3.3.0


#### Langkah Pengerjaan
- Clone repo project dari `git@github.com:hasabistudio/next-js.git`
- Buat branch dengan nama sendiri : ``git checkout -b [nama dev]``

#### API
- url : `http://api-corsec.hasabi.id/api/`
- login : `POST:{{url}}/v1/auth/login`
  - Request : username, password
    > u : admin@admin.com <br> p : password
- logout : ``POST: {{url}}/v1/auth/login``
 - Authorization : _bearer token_
- Create Vendor : ``POST: {{url}}/v1/vendor``
 - Authorization : _bearer token_
 - Request: name(string), 
   tdr(string), 
   tdr_start_date (date:Y-m-d),
   tdr_end_date (date:Y-m-d) 
- List Vendor : ``GET: {{url}}/v1/vendor``
 - Authorization : _bearer token_
 - query : q (untuk pencarian data)
- Detail Vendor : ``GET: {{url}}/v1/vendor/[id]``
 - Authorization : _bearer token_
- Update Vendor : ``PUT: {{url}}/v1/vendor/[id]``
 - Authorization : _bearer token_
 - Request: name(string), 
   tdr(string), 
   tdr_start_date (date:Y-m-d),
   tdr_end_date (date:Y-m-d) 
- Delete Vendor : ``DELETE: {{url}}/v1/vendor/[id]``
 - Authorization : _bearer token_
 
#### Task
![List Vendor](/public/image/Screenshot_2.png)
> fitur pencarian data berfungsi
> fitur pagination berfungsi
> abaikan tab active & expire
> tab all bersisi jumlah keselurhan data (bukan total data per page)
> Saat proses hapus data, muncul pop up konfirmasi penghapusan data


![Create Vendor](/public/image/Screenshot_3.png)
> Modal / Pop Up muncul saat penambahan, perubahan atau detail data.
> Jika saat penambahan data / perubahan data terdapat respon kesalahan di backend, tampilkan kesalahan tersebut didalam form. misal duplikat inputan TDR
> Jika saat submit terdapat pesan kesalahan dari backend, nilai dari inputan data tidak hilang -->

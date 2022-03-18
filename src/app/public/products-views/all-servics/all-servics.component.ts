import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servics } from 'src/app/core/shared/models/service.model';
import { ServicsService } from 'src/app/core/shared/services/servics/servics.service';

@Component({
    selector: 'app-allservics',
    templateUrl: 'all-servics.component.html',
    styleUrls:['all-servics.component.scss']

})

export class AllservicsComponent implements OnInit {
    constructor(private servicsService:ServicsService, private route: ActivatedRoute, private router: Router) { }
    services: Servics | any;

    page: number = 0;
    order: string | any;
    category: string | any;
    public search: string='';

    ngOnInit() {
        this.loadServics();
    }

    loadServics(){
        this.servicsService.getAllServices().subscribe(services =>{
            this.services = services
            const reader = new FileReader();
            reader.onload =(this.services);
        });
        if(this.route.snapshot.paramMap.get('search') != null){
            this.category = this.route.snapshot.paramMap.get('search');
        }
    }

    nextPage(){
        if(this.services != null){
            this.page += 9; 
        }
    }
    
    prevPage(){
        if(this.page > 0){
            this.page -=9;
        }
    }

    initPage(){
        this.page = 0; 
    }

    allServices(){
        this.router.navigate(['/allservics']);
        this.reloadPage()
    }

    allProducts(){
        this.router.navigate(['/allproducts']);
    }

    orderBy(order: string){
        this.order = order;
    }

    filterBy(category: string){
        this.category = category;
    }

    onSearch(search: string){
        this.search = search;
        this.page = 0; 
    }

    reloadPage(){
        window.location.reload();
    }
}

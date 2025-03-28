import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Ingredient } from '../../models/Ingredient';
declare var bootstrap: any;

@Component({
 selector: 'app-ingredient-list',
 templateUrl: './ingredient-list.component.html',
 styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements AfterViewInit {
 @Input() ingredients: Ingredient[] = [];
 @Output() edit = new EventEmitter<Ingredient>();
 @Output() delete = new EventEmitter<number>();
 @Output() deleteAll = new EventEmitter<void>();
 
 ingredientToDelete: Ingredient | null = null;
 private deleteModal: any;
 private deleteAllModal: any;
 
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
 
 ngAfterViewInit(): void {
   // Exécuter ce code uniquement côté navigateur
   if (isPlatformBrowser(this.platformId)) {
     setTimeout(() => {
       const deleteModalEl = document.getElementById('deleteModal');
       if (deleteModalEl) {
         this.deleteModal = new bootstrap.Modal(deleteModalEl);
       }
       
       const deleteAllModalEl = document.getElementById('deleteAllModal');
       if (deleteAllModalEl) {
         this.deleteAllModal = new bootstrap.Modal(deleteAllModalEl);
       }
     }, 100);
   }
 }
 
 confirmDelete(ingredient: Ingredient): void {
   this.ingredientToDelete = ingredient;
   if (this.deleteModal) {
     this.deleteModal.show();
   } else {
     // Fallback si le modal n'est pas initialisé
     if (confirm(`Voulez-vous vraiment supprimer l'ingrédient ${ingredient.nom} ?`)) {
       this.deleteConfirmed();
     }
   }
 }
 deleteConfirmed(): void {
  if (this.ingredientToDelete && this.ingredientToDelete.id !== null) {
    // Convertir null en undefined si nécessaire
    const idToEmit = this.ingredientToDelete.id;
    this.delete.emit(idToEmit);
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
    this.ingredientToDelete = null;
  }
}
 
 confirmDeleteAll(): void {
   if (this.deleteAllModal) {
     this.deleteAllModal.show();
   } else {
     // Fallback si le modal n'est pas initialisé
     if (confirm("Voulez-vous vraiment supprimer TOUS les ingrédients ? Cette action est irréversible.")) {
       this.deleteAllConfirmed();
     }
   }
 }
 
 deleteAllConfirmed(): void {
   this.deleteAll.emit();
   if (this.deleteAllModal) {
     this.deleteAllModal.hide();
   }
 }
 
 editIngredient(ingredient: Ingredient): void {
   this.edit.emit(ingredient);
 }
}
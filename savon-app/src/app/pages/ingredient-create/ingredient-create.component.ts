import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../../models/Ingredient';
import { IngredientService } from '../../services/ingredients.service';


@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class AjouterIngredientComponent implements OnInit {
  ingredient: Ingredient = new Ingredient();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private ingredientService: IngredientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  onIngredientSave(ingredient: Ingredient): void {
    this.ingredientService.addIngredient(ingredient).subscribe({
      next: (response) => {
        console.log('Ingrédient enregistré avec succès:', response);
        this.successMessage = 'Ingrédient enregistré avec succès !';
        setTimeout(() => {
          this.router.navigate(['/ingredients']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'ingrédient:', error);
        this.errorMessage = 'Erreur lors de l\'enregistrement de l\'ingrédient.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/ingredients']);
  }

  // Cette méthode est préservée pour la compatibilité
  onSubmit(): void {
    this.onIngredientSave(this.ingredient);
  }
}
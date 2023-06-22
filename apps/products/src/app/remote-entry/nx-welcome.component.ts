import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '@bni-pretest-web/shared/data-product';

@Component({
  selector: 'bni-pretest-web-nx-welcome',
  template: `
    <button (click)="openAddProductDialog()">Add Product</button>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of products">
          <td>{{ product.title }}</td>
          <td>
            <button (click)="openAddProductDialog(product)">Edit</button>
            <button (click)="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ng-template #addProductDialog let-dialog>
      <h2 class="popup-title">{{ selectedProduct ? 'Edit Product' : 'Add Product' }}</h2>
      <form [formGroup]="productForm" (ngSubmit)="addProduct()" class="popup-form">
        <div>
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            [formControlName]="'title'"
            required
            class="popup-input"
            [ngClass]="{ 'invalid': productForm.controls['title'].invalid && productForm.controls['title'].touched }"
          >
          <div
            *ngIf="productForm.controls['title'].invalid && productForm.controls['title'].touched"
            class="error-message"
          >
            Title is required.
          </div>
        </div>
        <button type="submit" class="popup-button">{{ selectedProduct ? 'Update' : 'Add' }}</button>
      </form>
    </ng-template>
  `,
  styles: [
    `
    button {
      padding: 8px 16px;
      background-color: #4285f4;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }

    th {
      background-color: #f5f5f5;
      padding: 8px;
      font-weight: bold;
      text-align: left;
    }

    td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }

    .popup-title {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .popup-form {
      padding: 20px;
      background-color: #f1f1f1;
    }

    .popup-input {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .popup-button {
      padding: 8px 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .popup-button:hover {
      background-color: #0056b3;
    }

    .popup-input.invalid {
      border-color: red;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class NxWelcomeComponent implements OnInit {
  @ViewChild('addProductDialog', { static: true }) addProductDialog!: TemplateRef<any>;

  products: any[] = [];
  productForm: FormGroup;
  private dialogRef!: MatDialogRef<any>;
  selectedProduct: any = null;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  openAddProductDialog(product?: any) {
    this.selectedProduct = product ? { ...product } : null;
    this.productForm.patchValue({
      title: product ? product.title : '',
      description: product ? product.description : ''
    });
    this.dialogRef = this.dialog.open(this.addProductDialog);
  }

  addProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = {
      title: this.productForm.value.title,
      description: this.productForm.value.description
    };

    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, productData).subscribe(
        () => {
          this.dialogRef.close();
          this.loadProducts();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      this.productService.createProduct(productData).subscribe(
        () => {
          this.dialogRef.close();
          this.loadProducts();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}

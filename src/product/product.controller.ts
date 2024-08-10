import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CrateProductDto } from "./dtos/product.dto";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductsController{
    constructor(private productService: ProductService) {}
    @Post()
    async createProducts(@Body() createProduct:CrateProductDto){
        return await this.productService.createProduct(createProduct);
    }

    @Get()
    async findAllProducts(){
        return await this.productService.findAllProducts();
    }

    @Post('/create')
    async bookItem(@Query('id') id :string, @Query('userId') userId :string, @Query('date') date :string){
        return await this.productService.bookItem(id,userId,date);
    }

}
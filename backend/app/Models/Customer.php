<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable=['name'];

    public function borrows()
    {
        return $this->hasMany(Borrow::class);
    }
}

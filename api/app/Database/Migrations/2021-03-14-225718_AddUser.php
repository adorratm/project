<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddUser extends Migration
{
  public function up()
  {
    $this->forge->addField([
      'id' => [
        'type' => 'INT',
        'constraint' => 5,
        'unsigned' => true,
        'auto_increment' => true,
      ],
      'name' => [
        'type' => 'VARCHAR',
        'constraint' => '100',
        'null' => false
      ],
      'email' => [
        'type' => 'VARCHAR',
        'constraint' => '100',
        'null' => false,
        'unique' => true
      ],
      'password' => [
        'type' => 'VARCHAR',
        'constraint' => '255',
        'null' => false,
        'unique' => true
      ],
      'phone' => [
        'type' => 'VARCHAR',
        'constraint' => '19',
        'null' => false,
        'unique' => true
      ],
      'isAdmin' => [
        'type' => 'TINYINT',
        'constraint' => 1,
        'null' => false,
        'default' => 0
      ],
      'updated_at' => [
        'type' => 'datetime',
        'null' => true,
      ],
      'created_at datetime default current_timestamp',
    ]);
    $this->forge->addPrimaryKey('id');
    $this->forge->createTable('user');
  }

  public function down()
  {
    $this->forge->dropTable('user');
  }
}

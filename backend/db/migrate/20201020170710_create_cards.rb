class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :desc
      t.string :img_sm
      t.belongs_to :cart

      t.timestamps
    end
  end
end

import sqlite3

def clean_test_users(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        # Ajuste o nome da tabela e coluna conforme seu banco real
        cursor.execute("DELETE FROM authentication_user WHERE username LIKE 'testuser_%';")
        print("Usuários de teste removidos com sucesso.")
        cursor.execute("DELETE FROM articles_article WHERE created_at LIKE '2025-06-26%';")
        print("artigos de teste removidos com sucesso.")
        cursor.execute("DELETE FROM profiles_profile WHERE created_at LIKE '2025-06-26%';")
        print("perfils de teste removidos com sucesso.")
        conn.commit()
        
    except Exception as e:
        print("Erro ao limpar usuários de teste:", e)
    finally:
        conn.close()

if __name__ == "__main__":
    db_path = "productionready-django-api\db.sqlite3"
    clean_test_users(db_path)
